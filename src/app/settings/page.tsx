import { TypographySettings } from '@/components/Settings/TypographySettings';

export default function SettingsPage() {
  return (
    <main className="p-6 pb-32">
      <h1 className="text-2xl font-serif mb-6">Settings</h1>
      <div className="space-y-6">
        <TypographySettings />
      </div>
    </main>
  );
}
