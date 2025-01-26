import Link from "next/link";

export default function DestresserPickButton({ route, destresserName }) {
    return (
        <Link href={route}>{destresserName}</Link>
    );
}