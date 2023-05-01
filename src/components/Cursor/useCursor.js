import { useThemeContext } from "../../context/ThemeContext";

export const useCursor = (image) => {
    const { cursorImage, showCursorImage, setCursorImage, setShowCursorImage } =
        useThemeContext();

    const setMemojiCursor = (e) => {
        setCursorImage(image);
        setShowCursorImage(true);
    };

    const resetCursorImage = (e) => {
        // TODO move this to cursor component setCursorImage(undefined);
        setShowCursorImage(false);
    };

    return {
        setMemojiCursor,
        resetCursorImage,
        cursorImage,
        showCursorImage,
        setCursorImage
    };
};
