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
import { Building, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getModelById } from "@/lib/actions/model";
import ErrorPage from "@/app/[locale]/error";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getModelById(id);
  if (!res.success) {
    return {
      title: res.status,
      description: res.message,
    };
  }
  const model = res.data;
  const brandName = model.brand?.name || "Unknown Brand";
  return {
    title: `${model.name} | ${model.code} | Fleet Management - NFC Rental CRM`,
    description:
      model.shortDescription ||
      model.description ||
      `Details and specifications for ${model.name} model by ${brandName}`,
    keywords: model.metadata?.tags?.join(", ") || `car rental, ${brandName}, ${model.name}`,
    openGraph: {
      title: `${model.name} | NFC Rental CRM`,
      description: model.shortDescription,
      type: "article",
      images: [
        {
          url: model.brand?.logo,
          width: 800,
          height: 600,
          alt: `${model.name} by ${brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} | NFC Rental CRM`,
      description: model.shortDescription,
    },
  };
}

export default async function ModelDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const res = await getModelById(id);
  if (!res.success) {
    return (
      <ErrorPage
        error={{
          message: res.message,
          status: res.status,
        }}
      />
    );
  }
  const model = res.data;

  return (
    <div className="space-y-6">
      <Header model={model} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <MainContent model={model} />
        <Sidebar model={model} />
      </div>
      <ModelTabs model={model} />
    </div>
  );
}

function Header({ model }: { model: any }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{model.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Code: {model.code}</span>
            {model.brand && (
              <>
                <span>•</span>
                <Link
                  href={`/fleet-management/brands/${model.brand.id}`}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Building className="h-3 w-3" />
                  <span>{model.brand.name}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/fleet-management/models/${model.id}/edit`}>
                <Button variant="outline">Edit Model</Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit this model's details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>View Cars</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all cars of this model</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

// Main Content Component
function MainContent({ model }: { model: any }) {
  return (
    <div className="md:col-span-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Model Information</CardTitle>
          <CardDescription>Details about the model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {model.description && (
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm whitespace-pre-line">{model.description}</p>
              </div>
            )}
            {model.brand && (
              <div>
                <h3 className="text-sm font-medium mb-2">Brand</h3>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  {model.brand.logo && (
                    <img
                      src={model.brand.logo}
                      alt={model.brand.name}
                      className="h-8 w-8 object-contain"
                    />
                  )}
                  <div>
                    <div className="font-medium">{model.brand.name}</div>
                    <Link
                      href={`/brands/${model.brand.id}`}
                      className="text-xs text-primary hover:underline"
                    >
                      View brand details
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {model.metadata?.tags?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {model.metadata.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sidebar Component
function Sidebar({ model }: { model: any }) {
  return (
    <div className="space-y-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Model Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatItem
              icon={<Tag className="h-5 w-5 text-muted-foreground" />}
              label="Tags"
              value={model.metadata?.tags?.length || 0}
            />
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span>Status</span>
              </div>
              <Badge variant={model.isActive ? "success" : "destructive"}>
                {model.isActive ? "Active" : "Inactive"}
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
              <span>{formatDate(new Date(model.createdAt))}</span>
            </div>
            {model.updatedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(new Date(model.updatedAt))}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-xs">{model.id}</span>
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
function ModelTabs({ model }: { model: any }) {
  return (
    <Tabs defaultValue="cars">
      <TabsList className="grid grid-cols-2 md:w-auto">
        <TabsTrigger value="cars">Cars</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
      </TabsList>
      <TabsContent value="cars">
        <Card>
          <CardHeader>
            <CardTitle>Cars</CardTitle>
            <CardDescription>Cars of this model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {"Error fetching cars"}
            </div>
            <div className="mt-4 text-center">
              <Link href={`/fleet-management/vehicles`}>
                <Button variant="outline">View All Cars</Button>
              </Link>
            </div>
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
            {model.metadata ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Title</h3>
                    <p>{model.metadata.title || "Not set"}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p>{model.metadata.description || "Not set"}</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  {model.metadata.tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {model.metadata.tags.map((tag: string, index: number) => (
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