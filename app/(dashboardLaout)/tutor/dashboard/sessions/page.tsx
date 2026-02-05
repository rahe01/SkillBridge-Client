import TutorBookedSessionsPage from "@/components/modules/tutor/tutorBookingSession";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome to SkillBridge 🎓
      </h1>
      <p>Connect with expert tutors, learn anything.</p>
      <TutorBookedSessionsPage></TutorBookedSessionsPage>
    </div>
  );
}
