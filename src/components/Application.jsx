import styles from "../css/tuitionreq.module.css";
const Application = ({ post, assignedTution }) => {
  const {
    location_name,
    applicant_name,
    applicant_email,
    applicant_phone_number,
    student_phone_number,
    salary,
    number_of_days,
    tution_id,
    guardian_id,
    tutor_id,
  } = post ?? {};

  const splitName = (tutor_name) => {
    const split = tutor_name.split(" ");
    const join = split.slice(0, 2).join(" ");
    return join;
  };

  const handleAssign = () => {
    assignedTution(tution_id, tutor_id, guardian_id);
  };
  return (
    <>
      <div className={styles.tuition_req}>
        <span>{tution_id}</span>
        <span>{splitName(applicant_name)}</span>
        <span>{applicant_email}</span>
        <span>{applicant_phone_number}</span>
        <span>{number_of_days} Days</span>
        <span>{salary}</span>
        <button type="button" onClick={handleAssign} className={styles.greeN}>
          Assigned
        </button>
      </div>
    </>
  );
};
export default Application;
