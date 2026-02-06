import AdminBookingsPage from "@/components/modules/admin/allBooking";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome to SkillBridge 🎓
      </h1>
      <p>Connect with expert tutors, learn anything.</p>
      <AdminBookingsPage></AdminBookingsPage>
    </div>
  );
}
