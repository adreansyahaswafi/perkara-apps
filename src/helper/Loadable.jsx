import { Suspense } from 'react';
import Spinner from '../components/Spinner';
// import ProgressIndicator from 'components/ProgressIndicator';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<Spinner />}>
        < Component {...props} />
    </Suspense >
);

export default Loadable