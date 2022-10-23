<Formik
  enableReinitialize
  initialValues={{ noOfHours: "", date: dateNow }}
  onSubmit={(values, { setSubmitting, resetForm }) => {
    setTimeout(async () => {
      try {
      } catch (err) {
        resetForm((values = { email: "", password: "" }));
      }
      // console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    /* and other goodies */
  }) => (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="bg-blue-500 rounded-md relative h-[10rem]">
          <h1>{noOfHours}</h1>
          <input
            type="Number"
            name="noOfHours"
            required={true}
            min={1}
            max={24}
            onChange={(e) => {
              return handleChange, setNoOfHours(e.target.value);
            }}
            onBlur={handleBlur}
            placeholder="1-24 (hours)"
            className=" h-full w-full opacity-0 absolute z-50"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            className="p-2 bg-blue-500 w-full h-1/2 text-white rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button className="p-2 bg-blue-500 w-full h-1/2 text-white rounded-md">
            Clear
          </button>
        </div>
      </div>
    </form>
  )}
</Formik>;
