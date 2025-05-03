declare module 'react-show-more-text' {
    import * as React from 'react';

    export interface ShowMoreTextProps {
        children: React.ReactNode;
        lines?: number;
        more?: string;
        less?: string;
        anchorClass?: string;
        expanded?: boolean;
        width?: number;
        keepNewLines?: boolean;
        onClick?: (expanded: boolean) => void;
        className?: string;
    }

    const ShowMoreText: React.FC<ShowMoreTextProps>;

    export default ShowMoreText;
}
