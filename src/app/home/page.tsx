// src/app/home/page.tsx
import AuthGuard from "@/components/Auth/AuthGuard";

export default function HomePage() {
  return (
    <AuthGuard>
      <div>Home</div>
    </AuthGuard>
  );
}
