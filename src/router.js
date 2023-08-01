// import Dashboard from './components/Dashboard/Dashboard.vue';
import LotTrace from './components/Lot Trace/LotTrace.vue';
import RegisterTrack from './components/Register Track/RegisterTrack.vue'
import WeTrackEpcis from './components/EPCIS WeTrack/WeTrackEpcis.vue';
export default[
    {path:"/",component:LotTrace},
    {path:"/register-track",component:RegisterTrack},
    {path:"/epcis-track",component:WeTrackEpcis},
    // {path:"/lot-trace",component:LotTrace},
]