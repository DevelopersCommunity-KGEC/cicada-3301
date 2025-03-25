import React from "react";
import CicadaLogo from "../../_global_components/cicada";
import styles from "./styles.module.scss";
import Heading from "../../_global_components/heading";

function Results() {
  return (
    <div className={styles.resultsPage}>
      <div className={styles.logoContainer}>
        <CicadaLogo variant="small" />
      </div>
      <p style={{
        paddingInline: '10px'
      }}>
        Hello. <br/> <br/> We have now found the individuals we sought. <br/> Thus our hour-long
        journey ends. <br/> <br/> For now. Thank you for your dedication and effort. If you <br/>
        were unable to complete the test, or did not receive <br/> an email, do not
        despair. <br/> <br/> There will be more opportunities like this one. <br/> <br/> Thank you all. <br/> <br/>
        3301
      </p>
    </div>
  );
}

export default Results;
