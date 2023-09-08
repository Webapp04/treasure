import styles from './style.module.scss';


export default function Footer() {
    return (
        <div className={styles.footer}>
            {
                !!process.env.REACT_APP_VERSION
                && <div className={styles.footer_version}>
                    v {process.env.REACT_APP_VERSION}
                </div>
            }
        </div>
    )
}