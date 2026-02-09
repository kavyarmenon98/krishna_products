import { Suspense } from 'react';
import PageLoader from './PageLoader';

/**
 * LazyLoadWrapper - Wraps lazy-loaded components with a loading fallback
 * @param {React.Component} Component - The lazy-loaded component
 * @param {React.Component} Fallback - Optional custom fallback component
 */
function LazyLoadWrapper({
    component: Component,
    fallback: Fallback = PageLoader,
    ...props
}) {
    return (
        <Suspense fallback={<Fallback />}>
            <Component {...props} />
        </Suspense>
    );
}

export default LazyLoadWrapper;
