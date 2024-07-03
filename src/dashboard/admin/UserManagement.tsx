import AdminLayout from "../../components/layouts/AdminLayout";
import DataTable from "../../components/dashboard/admin/DataTable";

const UserManagement: React.FC = () => (
  <AdminLayout>
    <section className="mt-20 ">
      <DataTable />
    </section>
  </AdminLayout>
);

export default UserManagement;
