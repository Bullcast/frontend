export function truncate(str: string, maxLength: number) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, 5) + "..." + str.slice(-3);
}
// export function formatTime(time: Date | null | undefined) {
//     if (!time) return '';
//     const validTime = time instanceof Date ? time : new Date(time);

//     const now = new Date();
//     const diffInMs = now.getTime() - validTime.getTime();
//     const diffInHours = diffInMs / (1000 * 60 * 60);
//     const diffInDays = diffInHours / 24;

//     if (diffInDays >= 1) {
//         return `${Math.floor(diffInDays)} days ago`;
//     } else {
//         return validTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
//     }
// }