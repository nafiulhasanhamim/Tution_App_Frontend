import styles from "../css/tuitionreq.module.css";
const AssignedTution = ({ post }) => {
  const { tution_id, tutor_name, tutor_email, tutor_phone_number } = post ?? {};
  const splitName = (tutor_name) => {
    const split = tutor_name.split(" ");
    const join = split.slice(0, 2).join(" ");
    return join;
  };
  return (
    <>
      <div className={styles.tuition_req}>
        <span>{tution_id}</span>
        <span> {splitName(tutor_name)}</span>
        <span>{tutor_email}</span>
        <span>{tutor_phone_number}</span>
      </div>
    </>
  );
};
export default AssignedTution;
