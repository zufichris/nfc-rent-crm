import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building, Car, Globe, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import { getBrandById } from "@/lib/actions/brands";
import { Image } from "@/components/misc/image";
import ErrorPage from "@/app/[locale]/error";

// Metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await getBrandById(params.id);

  if (!res.success) {
    return {
      title: "Brand Not Found",
      description: "The requested brand could not be found.",
    };
  }

  const brand = res.data;

  return {
    title: `${brand.name} - NFC Car Rental CRM`,
    description:
      brand.description || `View details and models for ${brand.name} vehicles`,
    keywords: [
      brand.name,
      "car rental",
      "fleet management",
      "vehicle brand",
      ...(brand.metadata?.tags || []),
    ].join(", "),
    openGraph: {
      title: `${brand.name} - NFC Car Rental CRM`,
      description:
        brand.description || `View details and models for ${brand.name} vehicles`,
      images: brand.logo ? [brand.logo] : [],
    },
  };
}

// Main Component
export default async function BrandDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const res = await getBrandById(id);

  if (!res.success) {
    return (
      <ErrorPage
        error={{
          cause: res.message,
          message: res.message,
          name: "brands",
          status: res.status,
        }}
      />
    );
  }

  const brand = res.data;

  return (
    <div className="space-y-6">
      <Header brand={brand} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MainContent brand={brand} />
        <Sidebar brand={brand} />
      </div>
      <BrandTabs brand={brand} />
    </div>
  );
}

// Header Component
function Header({ brand }: { brand: any }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-16 w-16 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold">{brand.name}</h1>
          <div className="text-muted-foreground">Code: {brand.code}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/fleet-management/brands/${brand.id}/edit`}>
          <Button variant="outline">Edit Brand</Button>
        </Link>
        <Link href={`/fleet-management/brands/new`}>
          <Button>Add Brand</Button>
        </Link>
      </div>
    </div>
  );
}

// Main Content Component
function MainContent({ brand }: { brand: any }) {
  return (
    <div className="md:col-span-2 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Brand Information</CardTitle>
          <CardDescription>Details about the brand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {brand.description && (
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm whitespace-pre-line">
                  {brand.description}
                </p>
              </div>
            )}
            {brand.website && (
              <div>
                <h3 className="text-sm font-medium mb-2">Website</h3>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {brand.website}
                  </a>
                </div>
              </div>
            )}
            {brand.metadata?.tags?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {brand.metadata.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {brand.coverImage && (
              <div>
                <h3 className="text-sm font-medium mb-2">Cover Image</h3>
                <Image src={brand.coverImage} alt={brand.name} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sidebar Component
function Sidebar({ brand }: { brand: any }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Brand Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatItem
              icon={<Car className="h-5 w-5 text-muted-foreground" />}
              label="Models"
              value={brand.models?.length || 0}
            />
            <StatItem
              icon={<Tag className="h-5 w-5 text-muted-foreground" />}
              label="Tags"
              value={brand.metadata?.tags?.length || 0}
            />
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span>Status</span>
              </div>
              <Badge variant={brand.isActive ? "success" : "destructive"}>
                {brand.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{formatDate(new Date(brand.createdAt))}</span>
            </div>
            {brand.updatedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(new Date(brand.updatedAt))}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-xs">{brand.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Item Component
function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-bold">{value}</span>
    </div>
  );
}

// Tabs Component
function BrandTabs({ brand }: { brand: any }) {
  return (
    <Tabs defaultValue="models">
      <TabsList className="grid grid-cols-2 md:w-auto">
        <TabsTrigger value="models">Models</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
      </TabsList>
      <TabsContent value="models">
        <Card>
          <CardHeader>
            <CardTitle>Models</CardTitle>
            <CardDescription>Car models from this brand</CardDescription>
          </CardHeader>
          <CardContent>
            {brand.models?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {brand.models.map((model: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border rounded-lg"
                  >
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{model}</div>
                      <Link
                        href={`/models?brand=${brand.id}`}
                        className="text-xs text-primary hover:underline"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-muted-foreground">
                  No models available for this brand
                </p>
                <Button variant="outline" className="mt-4">
                  Add Model
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="metadata">
        <Card>
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>SEO and additional information</CardDescription>
          </CardHeader>
          <CardContent>
            {brand.metadata ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Title</h3>
                    <p>{brand.metadata.title || "Not set"}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p>{brand.metadata.description || "Not set"}</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  {brand.metadata.tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {brand.metadata.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No tags set</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <p className="text-muted-foreground">No metadata available</p>
                <Button variant="outline" className="mt-4">
                  Add Metadata
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}