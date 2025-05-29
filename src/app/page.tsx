import { redirect } from 'next/navigation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect('/en');
}
