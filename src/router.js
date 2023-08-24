// import Dashboard from './components/Dashboard/Dashboard.vue';
import LotTrace from './components/Lot Trace/LotTrace.vue';
import RegisterTrack from './components/Register Track/RegisterTrack.vue'
import WeTrackEpcis from './components/EPCIS WeTrack/WeTrackEpcis.vue';
import WeTrackEPCIS_dscsa from './components/EPCIS WeTrack/EPCIS_dscsa.vue';
import SuiteTraceReports from './components/SuiteTrace Reports/SuiteTraceReports.vue'
export default[
    {path:"/",component:LotTrace},
    {path:"/register-track",component:RegisterTrack},
    {path:"/epcis-track",component:WeTrackEpcis},
    {path:'/epcis-dscsa',component:WeTrackEPCIS_dscsa},
    {path:'/suitetrace-reports',component:SuiteTraceReports},
    // {path:"/lot-trace",component:LotTrace},
]