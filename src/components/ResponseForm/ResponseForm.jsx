import "./ResponseForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResponseForm = () => {
  const [twoFactor, setTwoFactor] = useState("");
  const [twoFactorStatus, setTwoFactorStatus] = useState(2);
  const [biometrics, setBiometrics] = useState("");
  const [biometricsStatus, setBiometricsStatus] = useState(2);
  const [notifications, setNotifications] = useState("");
  const [notificationsStatus, setNotificationsStatus] = useState(2);
  const [modulesCompleted, setModulesCompleted] = useState("");
  const [securityScore, setSecurityScore] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log(userId);
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`
        );
        setTwoFactor(response.data.twoFactorIsSet);
        setBiometrics(response.data.biometricsIsSet);
        setNotifications(response.data.notificationsActive);

        setModulesCompleted(response.data.modules_completed);
        setSecurityScore(response.data.security_score);
      } catch (e) {
        console.error("error getting user data:", e);
      }
    };
    fetchUserInfo();
    convertTwoFactorStatus();
  }, []);

  const convertTwoFactorStatus = () => {
    if (!twoFactorStatus === 1) {
      setTwoFactorStatus(2);
      setTwoFactor(false);
    } else {
      setTwoFactorStatus(1);
      setTwoFactor(true);
    }
  };

  const handleTwoFactor = (value) => {
    setTwoFactor(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      twoFactorIsSet: twoFactor,
      biometricsIsSet: biometrics,
      notificationsActive: notifications,
      modules_completed: modulesCompleted,
      security_score: securityScore,
    };
    async function updatePreferences() {
      try {
        const res = await axios.put(
          `http://localhost:8080/users/${userId}`,
          updatedUser
        );
      } catch (error) {
        console.error("error caught in the catch block:", error);
      }
    }

    updatePreferences();
  };
  return (
    <section className="preferences">
      <form className="form" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="body">
          <div className="container1">
            <h2 className="container1_title">User Preferences</h2>
            <div className="two-factor-status">
              <h3 className="two-factor-status__title">Two Factor</h3>
              <div className="two-factor-status__radios">
                <label className="two-factor-status__radio-label">
                  <input
                    className="two-factor-status__radio"
                    type="radio"
                    name="twoFactorStatus"
                    value="True"
                    checked={twoFactorStatus === 1}
                    onChange={() => handleTwoFactor(1)}
                  />
                  On
                </label>
                <label className="two-factor-status__radio-label">
                  <input
                    className="two-factor-status__radio"
                    type="radio"
                    name="status"
                    value="out of stock"
                    checked={twoFactorStatus === 2}
                    onChange={() => handleTwoFactor(2)}
                  />
                  Off
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="preferences__form-buttons">
          <input
            className="preferences__form-save-button"
            type="submit"
            name="save"
            value="Save"
          />
        </div>
      </form>
    </section>
  );
};

export default ResponseForm;
