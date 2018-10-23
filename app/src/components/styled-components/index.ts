import { ThemedStyledFunction } from 'styled-components';

export const styledTS = <U>() =>
    <T, P = U, O = {}>(
        fn: ThemedStyledFunction<P, T, O>,
    ): ThemedStyledFunction<P & U, T, O & U> => fn;
