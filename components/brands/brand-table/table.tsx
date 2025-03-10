"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable, type DataTableColumn } from "../../misc/table/data-table";
import { GetBrandsFilters, IBrand } from "@/types/brand";
import { DataTableFilter } from "../../misc/table/filter";
import { BrandTableColumns } from "./columns";
import { BrandActionsModal, ActionTypes } from "./action-modals";
import { Globe } from "lucide-react";


type BrandTableProps = Readonly<{
  brands: IBrand[];
  total: number;
  page: number;
  limit: number;
  activeFilters?: GetBrandsFilters
}>;

const brandFilters: DataTableFilter[] = [
  {
    key: "country",
    name: "Country",
    type: "select",
    options: [
      { label: "United States", value: "United States" },
      { label: "Germany", value: "Germany" },
      { label: "Japan", value: "Japan" },
      { label: "Italy", value: "Italy" },
    ],
  },
  {
    key: "status",
    name: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    key: "minFounded",
    name: "Founded After",
    type: "text",
  },
];

export function BrandListTable({
  brands = [],
  total = 0,
  page = 0,
  limit = 0,
  activeFilters
}: BrandTableProps) {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<IBrand | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [actionType, setActionType] = useState<ActionTypes | undefined>();

  const brandActions = [
    {
      name: "View Website",
      icon: <Globe size={16} />,
      onClick: (brand: IBrand) => {
        const a = window.document.createElement("a")
        a.href = brand.website ?? "#"
        a.target = "_blank"
        a.click()
      },
    }
  ]



  return (
    <>
      <DataTable
        title="Brand Management"
        name="Brand"
        items={brands}
        columns={BrandTableColumns as DataTableColumn[]}
        filters={brandFilters}
        idField="id"
        total={total}
        page={page}
        limit={limit}
        nameField="name"
        setSelectedItems={setSelectedBrands}
        selectedItems={selectedBrands}
        actions={brandActions}
        activeFilters={activeFilters}
        onAdd={() => router.push("/brands/new")}
        onView={(brand: IBrand) => {
          setSelectedBrand(brand);
          setActionType("view");
        }}
        onEdit={(brand: IBrand) => router.push(`/brands/${brand.id}/edit`)}
        onDelete={(brand: IBrand) => {
          setSelectedBrand(brand);
          setActionType("delete");
        }}
        onBulkDelete={(items: string[]) => {
          setSelectedBrands(items);
          setActionType("bulk delete");
        }}
        onFiltersChange={(filters: Record<string, any>) => {
          const searchParams = new URLSearchParams(filters);
          router.push(`?${searchParams.toString()}`);
        }}
      />
      <BrandActionsModal
        isOpen={actionType !== undefined}
        type={actionType}
        selectedBrands={selectedBrands}
        brand={selectedBrand}
        onClose={() => setActionType(undefined)}
        onSuccess={() => {
          setActionType(undefined);
          setSelectedBrand(undefined);
          setSelectedBrands([]);
        }}
      />
    </>
  );
}