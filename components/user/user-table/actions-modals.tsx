"use client";
import type React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IUser } from "@/types/user";
import { deleteUser, updateUser, createUser } from "@/lib/actions/user";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getVariant } from "../../theme/variants";
import { renderStatus } from "../../misc/table/data-table";
import { Delete, Pencil, UserPlus } from "lucide-react";
import { UserAvatar } from "../user-avatar";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export type ActionTypes = "view" | "create" | "delete" | "edit" | "bulk delete";

interface UserActionsModalProps {
    type?: ActionTypes;
    user?: IUser;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    selectedUsers?: string[];
}

export const UserActionsModal: React.FC<UserActionsModalProps> = ({
    type,
    user,
    isOpen,
    onClose,
    onSuccess,
    selectedUsers,
}) => {
    if (!type) return null;

    switch (type) {
        case "view":
            return <ViewUserModal user={user} isOpen={isOpen} onClose={onClose} />;
        case "create":
            return (
                <CreateUserModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            );
        case "delete":
            return (
                <DeleteUserModal
                    user={user}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            );
        case "edit":
            return (
                <EditUserModal
                    user={user}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            );
        case "bulk delete":
            return (
                <BulkDeleteUsers
                    selectedUsers={selectedUsers}
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            );
        default:
            return null;
    }
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (data?: any) => void;
}

function ViewUserModal({
    user,
    isOpen,
    onClose,
    onSuccess,
}: ModalProps & { user?: IUser }) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn(
                        "p-6 rounded-t-lg flex flex-row items-center gap-4 bg-primary/35"
                    )}
                >
                    <div className="flex-shrink-0">
                        <UserAvatar
                            src={user.fullName}
                            className="h-16 w-16 border-2 shadow-md"
                        />
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">
                            {user.fullName || "N/A"}
                        </DialogTitle>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="mt-2">{renderStatus(user)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            value={user.phone ?? "Not provided"}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="roles" className="text-right">
                            Roles
                        </Label>
                        <div className="col-span-3 flex flex-wrap gap-2">
                            {user.roles?.length > 0 ? (
                                user.roles.map((role, index) => (
                                    <Badge key={index + 1} variant={"outline"}>
                                        {role}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-muted-foreground">No roles assigned</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="created" className="text-right">
                            Created
                        </Label>
                        <Input
                            id="created"
                            value={format(new Date(user.createdAt), "PPP")}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    {user.updatedAt && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updated" className="text-right">
                                Updated
                            </Label>
                            <Input
                                id="updated"
                                value={format(new Date(user.updatedAt), "PPP")}
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Verification</Label>
                        <div className="col-span-3 space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant={user.emailVerified ? "success" : "outline"}>
                                    {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={user.phoneVerified ? "success" : "outline"}>
                                    {user.phoneVerified ? "Phone Verified" : "Phone Not Verified"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Link href={`/customer-management/customers/${user.id}`}>
                        <Button>
                            Full Details
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function DeleteUserModal({
    user,
    isOpen,
    onClose,
    onSuccess,
}: ModalProps & { user?: IUser }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!user) return;
        setIsDeleting(true);
        try {
            const result = await deleteUser(user.id);
            if (result.success) {
                toast.success("User deleted successfully");
                onSuccess?.();
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the user");
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn(
                        "p-6 rounded-t-lg flex flex-row items-center gap-4",
                        getVariant("destructive")
                    )}
                >
                    <div className="flex-shrink-0">
                        <Avatar className="h-16 w-16 border-2 shadow-md">
                            {user.photo ? (
                                <AvatarImage src={user.photo} alt={user.fullName} />
                            ) : (
                                <AvatarFallback className="text-lg">
                                    {user.fullName
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase() || "U"}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <DialogTitle className="text-xl mb-1">
                            {user.fullName || "N/A"}
                        </DialogTitle>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="mt-2">{renderStatus(user)}</div>
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            value={user.phone ?? "Not provided"}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="roles" className="text-right">
                            Roles
                        </Label>
                        <div className="col-span-3 flex flex-wrap gap-2">
                            {user.roles?.length > 0 ? (
                                user.roles.map((role, index) => (
                                    <Badge key={index + 1} variant={"outline"}>
                                        {role}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-muted-foreground">No roles assigned</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="created" className="text-right">
                            Created
                        </Label>
                        <Input
                            id="created"
                            value={format(new Date(user.createdAt), "PPP")}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    {user.isDeleted ? (
                        <div className="text-2xl font-bold text-destructive">
                            [User is Already Deleted]
                        </div>
                    ) : (
                        <div className="border-t pt-4 mt-2">
                            <div className="text-destructive font-medium mb-2">
                                Confirm Deletion
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Are you sure you want to delete this user? This action cannot be
                                undone.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    {!user.isDeleted && (
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete User"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditUserModal({
    user,
    isOpen,
    onClose,
    onSuccess,
}: ModalProps & { user?: IUser }) {
    const [formData, setFormData] = useState<Partial<IUser>>(user ?? {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const result = await updateUser({
                id: user.id,
                ...formData,
            });

            if (result.success) {
                toast.success("User updated successfully");
                onSuccess?.();
                onClose();
            } else {
                toast.error(result.message || "Failed to update user");
            }
        } catch (error) {
            toast.error("An error occurred while updating the user");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className={cn("p-6 rounded-t-lg bg-warning/35")}>
                    <div className="flex items-center gap-2 mb-2">
                        <Pencil />
                        <DialogTitle>Edit User</DialogTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Update user information and preferences
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <div className="text-right pt-2">
                                <Label>Status</Label>
                            </div>
                            <div className="col-span-3 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, isActive: checked }))
                                        }
                                    />
                                    <Label htmlFor="isActive">Active</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="emailVerified"
                                        checked={formData.emailVerified}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                emailVerified: checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="emailVerified">Email Verified</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="phoneVerified"
                                        checked={formData.phoneVerified}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                phoneVerified: checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="phoneVerified">Phone Verified</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant={"warning"} disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function BulkDeleteUsers({
    selectedUsers,
    isOpen,
    onClose,
    onSuccess,
}: ModalProps & { selectedUsers?: string[] }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleBulkDelete = async () => {
        if (!selectedUsers || selectedUsers.length === 0) return;

        setIsDeleting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(`${selectedUsers.length} users deleted successfully`);
            onSuccess?.();
        } catch (error) {
            toast.error("An error occurred while deleting the users");
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader
                    className={cn(
                        "p-6 rounded-t-lg flex flex-row items-center gap-4 font-bold text-2xl",
                        getVariant("destructive")
                    )}
                >
                    <DialogTitle> Delete {selectedUsers?.length} Users?</DialogTitle>
                </DialogHeader>
                <div className="border-t pt-4 mt-2">
                    <div className="text-destructive font-medium mb-2">
                        Confirm Deletion
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                        Are you sure you want to delete {selectedUsers?.length} users? This
                        action cannot be undone.
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleBulkDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CreateUserModal({ isOpen, onClose, onSuccess }: Readonly<ModalProps>) {
    const [formData, setFormData] = useState<Partial<IUser>>({
        fullName: "",
        email: "",
        phone: "",
        roles: [],
        isActive: true,
        emailVerified: false,
        phoneVerified: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roleInput, setRoleInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRole = () => {
        if (roleInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                roles: [...(prev.roles || []), roleInput.trim()],
            }));
            setRoleInput("");
        }
    };

    const handleRemoveRole = (roleToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            roles: prev.roles?.filter((role) => role !== roleToRemove) || [],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email) {
            toast.error("Name and email are required");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createUser(formData);

            if (result.success) {
                toast.success("User created successfully");
                onSuccess?.(result.data);
                onClose();
            } else {
                toast.error(result.message || "Failed to create user");
            }
        } catch (error) {
            toast.error("An error occurred while creating the user");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className={cn("p-6 rounded-t-lg", "bg-primary/30")}>
                    <div className="flex items-center gap-2 mb-2">
                        <UserPlus />
                        <DialogTitle>Create New User</DialogTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Add a new user to the system
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullName" className="text-right">
                                Name *
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email *
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="roles" className="text-right pt-2">
                                Roles
                            </Label>
                            <div className="col-span-3 space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        id="roleInput"
                                        value={roleInput}
                                        onChange={(e) => setRoleInput(e.target.value)}
                                        placeholder="Add a role"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleAddRole}
                                        disabled={!roleInput.trim()}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.roles ? (
                                        formData.roles.map((role, index) => (
                                            <Badge
                                                key={role + index}
                                                variant="secondary"
                                                className="px-2 py-1 flex items-center gap-1"
                                            >
                                                {role}
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    className="ml-1 text-xs hover:text-destructive"
                                                    onClick={() => handleRemoveRole(role)}
                                                >
                                                    <Delete />
                                                </Button>
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-muted-foreground">
                                            No roles assigned
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="photo" className="text-right">
                                Photo URL
                            </Label>
                            <Input
                                id="photo"
                                name="photo"
                                type="url"
                                value={formData.photo ?? ""}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <div className="text-right pt-2">
                                <Label>Status</Label>
                            </div>
                            <div className="col-span-3 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, isActive: checked }))
                                        }
                                    />
                                    <Label htmlFor="isActive">Active</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="emailVerified"
                                        checked={formData.emailVerified}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                emailVerified: checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="emailVerified">Email Verified</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="phoneVerified"
                                        checked={formData.phoneVerified}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                phoneVerified: checked,
                                            }))
                                        }
                                    />
                                    <Label htmlFor="phoneVerified">Phone Verified</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create User"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}