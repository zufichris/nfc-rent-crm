import { DataTableColumn, renderStatus } from "@/components/misc/table/data-table";
import { UserAvatar } from "../user-avatar";
import { Badge } from "@/components/ui/badge";

export const UserTableColumns: DataTableColumn[] = [
    {
        key: "fullName",
        name: "User",
        render(value: string, item) {
            return (
                <div className="flex items-center space-x-3">
                    <UserAvatar
                        isLoggedInUser={false}
                        src={item.photo}
                        alt={value}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium text-foreground">{value}</div>
                        <div className="text-sm text-muted-foreground">+{item.phone}</div>
                        <div className="text-sm text-muted-foreground">{item.email}</div>
                    </div>
                </div>
            );
        },
    },
    {
        key: "roles",
        name: "Role",
        render: (value: string[]) => (
            <>
                {value.map(r => <Badge variant={"outline"} key={r}>{r.toUpperCase()}</Badge>)}
            </>
        ),
    },
    {
        key: "isActive",
        name: "Status",
        render: (_, item) => {
            return renderStatus(item)
        }
    },
    {
        key: "emailVerified",
        name: "Verification",
        render: (_, item) => {
            return renderVerification(item)
        }
    },
    {
        key: "createdAt",
        name: "Created On",
        type: "date",
    },
];



function renderVerification({ emailVerified, phoneVerified }: Readonly<{ emailVerified: boolean, phoneVerified: boolean }>) {
    return <div className="flex flex-col gap-1 items-center">
        <Badge className="text-xs" variant={emailVerified ? "info" : "warning"}>{emailVerified ? "Email Verified" : "Email Not Verified"}</Badge>
        <Badge className="text-xs" variant={phoneVerified ? "info" : "warning"}>{phoneVerified ? "Phone Verified" : "Phone Not Verified"}</Badge>
    </div>
}