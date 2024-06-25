export default function AdminCard(props: any) {
  return (
    <div key={props.key} className='card card-side bg-base-100 shadow-xl'>
      <div className='w-full overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Uid</th>
              <th>Name</th>
              <th>Email</th>
              <th>Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className='hover'>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
