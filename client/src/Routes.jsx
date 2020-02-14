import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import RouteLayout from './components/RouteLayout'
import Weighing from './pages/Weighing/Index'
import StayingTruckList from './pages/StayingTruckList'
import BrandMaster from './pages/MasterMenu/BrandMaster'
import TruckMaster from './pages/MasterMenu/TruckMaster/TruckMaster'
import DestinationMaster from './pages/MasterMenu/DestinationMaster'
import OtherMaster from './pages/MasterMenu/OtherMaster'
import VendorMaster from './pages/MasterMenu/VendorMaster'
import MeasurementDataList from './pages/MeasurementDataList'
import SummaryReport from './pages/SummaryReport'
import ManualWeighing from './pages/ManualWeighing'
import ItemOperationSetting from './pages/SettingMenu/ItemOperationSetting/index'
import OperationSetting from './pages/SettingMenu/OperationSetting/Index'
import MaintenanceDataUpload from './pages/SettingMenu/MaintenanceDataUpload'
import Backup from './pages/SettingMenu/Backup/Index'
import Restore from './pages/SettingMenu/Restore'
import Update from './pages/SettingMenu/Update'

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
)
const NotFound = React.lazy(() => import('./components/NotFound'))

const Routes = () => {
  return (
    <React.Suspense fallback={loading()}>
      <Switch>
        <RouteLayout layout={MainLayout} component={Weighing} exact path="/" />
        <RouteLayout
          layout={MainLayout}
          component={BrandMaster}
          exact
          path="/brand-master"
        />
        <RouteLayout
          layout={MainLayout}
          component={TruckMaster}
          exact
          path="/truck-master"
        />
        <RouteLayout
          layout={MainLayout}
          component={DestinationMaster}
          exact
          path="/destination-master"
        />
        <RouteLayout
          layout={MainLayout}
          component={OtherMaster}
          exact
          path="/other-master"
        />
        <RouteLayout
          layout={MainLayout}
          component={VendorMaster}
          exact
          path="/vendor-master"
        />
        <RouteLayout
          layout={MainLayout}
          component={StayingTruckList}
          exact
          path="/staying-truck-list"
        />
        <RouteLayout
          layout={MainLayout}
          component={MeasurementDataList}
          exact
          path="/measurement-data-list"
        />
        <RouteLayout
          layout={MainLayout}
          component={SummaryReport}
          exact
          path="/summary-report"
        />
        <RouteLayout
          layout={MainLayout}
          component={ManualWeighing}
          exact
          path="/manual-weighing"
        />
        <RouteLayout
          layout={MainLayout}
          component={ItemOperationSetting}
          exact
          path="/item-operation-setting"
        />
        <RouteLayout
          layout={MainLayout}
          component={OperationSetting}
          exact
          path="/operation-setting"
        />
        <RouteLayout
          layout={MainLayout}
          component={MaintenanceDataUpload}
          exact
          path="/maintenance-data-upload"
        />
        <RouteLayout
          layout={MainLayout}
          component={Backup}
          exact
          path="/backup"
        />
        <RouteLayout
          layout={MainLayout}
          component={Restore}
          exact
          path="/restore"
        />
        <RouteLayout
          layout={MainLayout}
          component={Update}
          exact
          path="/update"
        />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
