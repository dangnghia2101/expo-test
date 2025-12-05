import '@/configs/constants/init';
import { Language } from '@/components';
import RootNavigator from '@/navigations/RootNavigator';

export default function App() {
  return (
    <Language>
      <RootNavigator />
    </Language>
  );
}
