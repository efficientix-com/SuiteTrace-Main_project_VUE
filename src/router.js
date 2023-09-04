// import Dashboard from './components/Dashboard/Dashboard.vue';
import LotTrace from './components/Lot Trace/LotTrace.vue';
import RegisterTrack from './components/Register Track/RegisterTrack.vue'
import WeTrackEpcis from './components/EPCIS WeTrack/WeTrackEpcis.vue';
import WeTrackEPCIS_dscsa from './components/EPCIS WeTrack/EPCIS_dscsa.vue';
import SuiteTraceReports from './components/SuiteTrace Reports/SuiteTraceReports.vue'
import QRScanning from './components/QR Scanning/qr_scanning.vue'
import ScanTransaction from './components/Scan Transaction/SuiteTrace_Scan_Transaction.vue'
export default[
    {path:"/",component:LotTrace},
    {path:"/register-track",component:RegisterTrack},
    {path:"/epcis-track",component:WeTrackEpcis},
    {path:'/epcis-dscsa',component:WeTrackEPCIS_dscsa},
    {path:'/suitetrace-reports',component:SuiteTraceReports},
    {path:'/qr-aggregation',component:QRScanning},
    {path:'/scan-transaction',component:ScanTransaction}
    // {path:"/lot-trace",component:LotTrace},
]