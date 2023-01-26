import React from "react";
// import auth from "../../firebase.init";
// import {
//   useSignInWithEmailAndPassword,
//   useSignInWithGoogle,
// } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
// import Loading from "../shared/LoadingSpiner";
import { Link } from "react-router-dom";
//  import auth from "../../firebase.init";
const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let signInError;
//   if (loading || gLoading) {
//     return <Loading></Loading>;
//   }

  if (error || gError) {
    signInError = (
      <p>className="text-red-500"{error?.message || gError?.message}</p>
    );
  }

  if (gUser) {
    console.log(user || gUser);
  }
  const onSubmit = (data) => {
    console(data);
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div
    //className="hero min-h-screen"
    //style={{
    //backgroundImage: `url("https://i.ibb.co/F4scFQF/bg-83.gif")`,
    // }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="flex h-screen justify-center items-center">
          <div class="card w-100 lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
                alt="Album"
              />
            </figure>

            <div className="card-body w-50">
              <h2 className="text-center text-2xl text-zinc-900 font-bold">
                Login
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    class="input input-bordered w-full max-w-xs"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is Required",
                      },

                      pattern: {
                        value: /[a-z0-9]+@[a-z].[a-z]{2,3}/,
                        message: "Provide a valid Email", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                    // aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  <label class="label">
                    {errors.email?.type === "required" && (
                      <span class="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}

                    {errors.email?.type === "pattern" && (
                      <span class="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>

                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    class="input input-bordered w-full max-w-xs"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is Required",
                      },

                      minLength: {
                        value: 6,
                        message: "Must be 6 chatarcters or longer ", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                    // aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  <label class="label">
                    {errors.password?.type === "required" && (
                      <span class="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}

                    {errors.password?.type === "minLength" && (
                      <span class="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>

                {signInError}
                <input
                  className=" btn w-full max-w-xs text-white"
                  type="submit"
                  value="Login"
                />
              </form>
              <p>
                <small className="text-violet-700">
                  New to GhuraGhuri?{" "}
                  <Link className="text-primary text-violet-700" to="/signup">
                    {" "}
                    Create New Account
                  </Link>
                </small>
              </p>
              <div className="divider">OR</div>
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-primary"
              >
                Continue With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;