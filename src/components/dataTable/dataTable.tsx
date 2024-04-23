import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card';

function DataTable(props: { tableData: any; columns: any }) {
  const { tableData, columns } = props;
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  let data = tableData;
  const table = useReactTable({
    data,
    columns,
    state: {
      // sorting,
    },
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <div className="mt-2 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  // Define a specific width for the checkbox column and title column
                  const columnWidth =
                    header.id === 'checkbox'
                      ? 'w-2'
                      : header.id === 'title'
                      ? 'min-w-[250px]'
                      : 'min-w-[150px]';

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      // onClick={header.column.getToggleSortingHandler()}
                      className={`border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start ${columnWidth}`}
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row, index) => {
                return (
                  <tr key={index}>
                    {row.getVisibleCells().map((cell) => {
                      // Define a specific width for the checkbox column and for title
                      const cellWidth =
                        cell.column.id === 'checkbox'
                          ? 'w-2'
                          : cell.column.id === 'title'
                          ? 'min-w-[250px]'
                          : 'min-w-[150px]';

                      return (
                        <td
                          key={cell.id}
                          className={`border-white/0 py-3  pr-4 ${cellWidth}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default DataTable;
