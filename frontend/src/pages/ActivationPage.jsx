import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  console.log(activation_token);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log("Account activated successfully!");
        } catch (err) {
          setError(true);
          console.error("Error activating account:", err);
        } finally {
          setLoading(false);
        }
      };
      sendRequest();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
