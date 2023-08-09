import styles from "../css/tuitionreq.module.css";
const Tuitionreq = ({ post }) => {
  const {
    location_name,
    phone_number,
    subject_name,
    salary,
    number_of_days,
    assigned_status,
    tution_id,
  } = post ?? {};
  return (
    <>
      <div className={styles.tuition_req}>
        <span>{tution_id}</span>
        <span>{location_name}</span>
        <span>
          {assigned_status === "Approved"
            ? phone_number
            : `${phone_number.substring(0, 5)}******`}
        </span>
        <span>{subject_name}</span>
        <span>{salary}</span>
        <span>{number_of_days}</span>
        <span>{assigned_status}</span>

        {/* <button type="button" className={styles.greeN}>
        Accept
      </button>
      <button type="button" className={styles.reD}>
        Reject
      </button> */}
      </div>
    </>
  );
};
export default Tuitionreq;
