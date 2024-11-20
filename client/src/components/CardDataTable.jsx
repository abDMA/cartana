import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { useState } from "react"
import DeleteGiftCard from "./DeleteGiftCard"
import GiftCardEdit from "./GiftCardEdit"
  
  
  export function DataTableDemo({giftCards,card}) {
  
      const data = giftCards
        
  
  
  
  
  
  
   const columns = [
    {
      accessorKey: "cardImg",
      header: "صورة البطاقة",
     
      cell: ({ row }) => (
        <div className="capitalize"><img src={row.getValue("cardImg")} alt="profile" className="w-10 h-8 rounded-md object-cover" /></div>
      ),
    },
    {
      accessorKey: "cardName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            البطاقات 
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("cardName")}</div>,
    },
    {
        accessorKey: "price",
        header: "سعر البطاقة",
       
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("price")}</div>
        ),
      },
    {
      accessorKey: "cardType",
      header: "نوع الحساب",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cardType")}</div>
      ),
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-left">المخزون</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("stock"))
  
        // Format the amount as a dollar amount
  
        return <div className="text-right font-medium">{amount}</div>
      },
    },
    {
      id: "العمليات",
      header: "العمليات",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>العمليات</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment._id)}
              >
                إنسخ معرف المستخدم
              </DropdownMenuItem>
              <DropdownMenuSeparator />
                <GiftCardEdit giftCards={card}  id={payment._id} />
              <DropdownMenuItem onClick={(e)=>e.preventDefault()}> <DeleteGiftCard  id={payment._id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  
  
  
  
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      useState({})
    const [rowSelection, setRowSelection] = useState({})
  
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
    
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10
    const totalRows = table?.getFilteredRowModel()?.rows?.length
    const totalPages= Math.ceil(totalRows/pageSize)
  
    const startIndex = (currentPage -1 ) *pageSize
    const currentRows = table?.getFilteredRowModel()?.rows?.slice(startIndex,startIndex + pageSize)
    const goToNextPage = ()=>{
        if (currentPage < totalPages) {
            setCurrentPage(currentPage +1)
        }
    }
    const goToPrevPage = ()=>{
        if (currentPage >1) {
            setCurrentPage(currentPage -1)
        }
    }
    return (
      <div className="lg:w-[52rem] md:w-[36rem] sm:w-[29rem] x:w-[25rem] xs:w-[20rem] xss:w-[16rem]">
        <div className="flex items-center py-4 px-1 gap-2">
          <Input
            placeholder="فلترة الأسماء....."
            value={(table.getColumn("cardName")?.getFilterValue() ) ?? ""}
            onChange={(event) =>
              table.getColumn("cardName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm placeholder:text-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                الأعمدة <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getFilteredRowModel()?.rows?.length ? (
               currentRows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table?.getFilteredSelectedRowModel()?.rows?.length}
            {table?.getFilteredRowModel()?.rows?.length} أعمدة
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage ===1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage ===totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }
  