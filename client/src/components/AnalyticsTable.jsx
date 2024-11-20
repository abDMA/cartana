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
import DeleteTransaction from "./DeleteTransaction"
import TransactionShow from "./TransactionShow"
  
  
  export function DataTableDemo({raport}) {
      const data = raport || []

   const columns = [
    {
      accessorKey: "buyerName",
      header: "إسم المشتري",
      cell: ({ row }) => <div className="lowercase line-clamp-1">{row.getValue("buyerName")}</div>,
    },
    {
        accessorKey: "buyerEmail",
        header: "البريد الالكتروني",
       
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("buyerEmail")}</div>
        ),
      },
    {
      accessorKey: "sellerName",
      header: "إسم البائع" ,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("sellerName")}</div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            الإجــمالــي 
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        
        const amount = parseFloat(row.getValue("totalPrice"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        // Format the amount as a dollar amount
  
        return <div className="text-center font-medium">{formatted}</div>
      },
    },
     {
      accessorKey: "status",
      header: "الحالة",
     
      cell: ({ row }) => (
        <div className="capitalize"><p className="px-1 py-1 bg-green-500 text-white text-xs text-center rounded-sm">{row.getValue("status")}</p> </div>
      ),
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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                إنسخ معرف المعاملة
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={(e)=>e.preventDefault()}> 
                <TransactionShow title={'عرض المعاملة'} id={payment.id} time={payment.createdAt} sellerName={payment.sellerName} sellerEmail={payment.sellerEmail} giftCards={payment.giftCard} balance={payment.balance} giftCard={payment.giftCard.giftCard} transactionPrice={payment.totalPrice}/>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e)=>e.preventDefault()}> 
                <DeleteTransaction id={payment.id}/>
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
  
    const startIndex = (currentPage -1 ) * pageSize
    const currentRows = table?.getFilteredRowModel()?.rows?.slice?.(startIndex,startIndex + pageSize)
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
      <div className="lg:w-[52rem] md:w-[36rem] sm:w-[29rem] x:w-[25rem] xs:w-[20rem] xss:w-[16rem]  ">
        <div className="flex items-center py-4 px-1 gap-2">
          <Input
            placeholder="  فلترة أسماء البائعين....  "
            value={(table.getColumn("sellerName")?.getFilterValue() ) ?? ""}
            onChange={(event) =>
              table.getColumn("sellerName")?.setFilterValue(event.target.value)
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
               currentRows?.map((row) => (
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
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    لا نتائج.
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
  