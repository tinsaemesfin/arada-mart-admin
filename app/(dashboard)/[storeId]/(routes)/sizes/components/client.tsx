"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useRouter,useParams } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps{
  data:SizeColumn[]
}

export const SizeClient :React.FC<SizeClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${data.length})`}
          description="Manage Your Store Sizes"
        />
        <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="Api " description="Api calls for Billboards" />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
