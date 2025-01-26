import Link from "next/link";
import styles from '../app/page.module.css';

export default function DestresserPickButton({ route, destresserName }) {
    return (
        <Link href={route}>{destresserName}</Link>
    );
}