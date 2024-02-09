import { SomeComponent } from './components/SomeComponent'
import { OtherComponent } from '../../components/OtherComponent'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <SomeComponent />
      <OtherComponent />
    </div>
  )
}
