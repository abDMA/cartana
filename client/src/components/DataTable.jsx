import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import { ArrowUpDown, ChevronDown, Loader, MoreHorizontal } from "lucide-react"
  
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
  import {  useState } from "react"
  import DeleteUser from "./DeleteUser"
  import UserEdit from "./UserEdit"
import { useReport } from "../store/useReportStore"
  export function DataTableDemo({
    users}) {
const [IsOpen, setIsOpen] = useState(false)
const [loading, setLoading] = useState(false)
      const data = users
      const {getVipTransactions,vipTransactions} = useReport()
      const handelShow =async (id)=>{
        setLoading(true)
       try {
         await getVipTransactions(id)
         setLoading(false)
         
       } catch (error) {
         console.log("err in user delete",error);
       }finally{
        setLoading(false)
       }
   }

   
 
    
   
     

  
  
  
  
  
   const columns = [
    {
      accessorKey: "userPicture",
      header: "",
     
      cell: ({ row }) => (
        <div className="capitalize"><img src={row.getValue("userPicture")} alt="profile" className="w-8 h-8 rounded-full object-cover" /></div>
      ),
    },
    {
      accessorKey: "userName",
      header: "المستخدمين",
     
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("userName")}</div>
      ),
    },
   
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            البريد الإلكتروني
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "userType",
      header: "نوع الحساب",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("userType")}</div>
      ),
    },
    {
      accessorKey: "balance",
      header: () => <div className="text-left">الرصيد</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("balance"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "العمليات",
      enableHiding: false,
      header: "العمليات",
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
              <DropdownMenuItem onClick={()=>{
                setIsOpen(true)
                handelShow(payment._id);
                
                }} >  
                <h1>عرض معاملات الحساب</h1>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e)=>e.preventDefault()}> <DeleteUser  id={payment._id} /></DropdownMenuItem>
              <DropdownMenuItem onClick={(e)=>e.preventDefault()}> <UserEdit  id={payment._id} />
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
      <div className="lg:w-[52rem] md:w-[36rem] sm:w-[29rem] x:w-[25rem] xs:w-[20rem] xss:w-[16rem] relative">
      {IsOpen && <div className="xs:min-w-[20rem]  mx-auto xss:min-w-[17rem] left-0 sm:left-20 py-12 absolute bg-white top-0 z-50 border-2 rounded-md shadow-sm " >
   <div  className="h-52 overflow-y-auto flex-1 flex items-center flex-col gap-2 px-2 py-2 border ">
  { vipTransactions?.map((item)=>(
            loading ? <Loader key={item._id} size={20} className="self-center animate-spin"/>:  item?.giftCards.map((card) => (
                <div
                  key={card._id}
                  className="w-full  border px-1 py-2 flex items-center gap-1"
                > 
                  <img
                    src={card?.giftCard?.cardImg}
                    alt="product img"
                    className="w-16 h-12 rounded-md object-cover"
                  />
                  <div className="w-full flex items-center gap-2">
                    <div className="h-10 flex flex-col justify-between">
                      <h6 className="text-xs font-bold">البطاقة</h6>
                      <h6 className="line-clamp-1 text-xs">{card?.giftCard?.cardName}</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                      <h6 className="text-xs font-bold">السعر</h6>
                      <h6 className="text-sm">{card.price}$</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                    <h6 className="text-xs font-bold">الكمية</h6>
                      <h6 className="text-sm">{card.quantity}</h6>
                    </div>
                    <div className="h-10 flex flex-col justify-between">
                    <h6 className="text-xs font-bold">الإجمالي</h6>
                    <h6 className="text-sm">{card.price *card.quantity}$</h6>
                    </div>
                  </div>
                </div>
              ))))}
            </div>
      <div onClick={()=>setIsOpen(false)} className='absolute top-4 right-2 bg-black rounded-full w-5 h-5 z-10 flex items-center justify-center active:bg-red-500 hover:bg-red-300 cursor-pointer'>
              <span className='text-white font-bold text-xs  '>X</span>
              </div>
      
      </  div>   } 
          <div className="flex items-center py-4 px-1 gap-2">
          <Input
            placeholder="فلترة البريد الإلكتروني....."
            value={(table.getColumn("email")?.getFilterValue() ) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
  