import React from "react";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const pic_url_sample =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXMzMyXl5eWlpbPz8+pqammpqaysrKvr6/JycnBwcGcnJzExMTHx8e2tra9vb2jo6Nclro/AAAED0lEQVR4nO3Y65ajKBSGYQUPgAr3f7fD3gghSdV0ZWbFqur1Pj+6U3jI/kQBMwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgB/DLiGs9rureCe7juNEwl+NhL/fz0lo7XMZ9qNGbf/TYd0fjwk/Oee77fFYlmPrm6zz0hb3W5Nz8u8mzdpqBzksOnu3XQ6Le217SLjLwX64OKT182jGzKTYCtums21M/mz0IUx2n422rrnhCPo5HOWQKYTN+lS2T2fGPqGNyeStxoTFXRrwGBtznHXF8bnRS91BKpTGya5S7W0Hm6/Tdph6VCgXpksoH+spw/5xMW/htfeWY5HeMV7bNlPajlW7aa87ppR7zMdJGnOgdPgjScWuJByXctikEbf7hOWKTPmcuvW6gFJYvt5Csmo1NpdoorZpDy+2XYpZBgobtauO/NmWfc8T1VMNkjHdJ5RjktNzSsb5smfRBSm1hM19o9fW5grqYlIKn1rCeulTt4cpJygJt3qqmrslDGfms3H0F4RTe/dlcZ7mWnRts0uXsD2na7t3B5tKJ2vCtsh25/3QEsa7UKHb9d1k7FjaEHpOVs61we7WCb5LlWOH2sl9wr0/LHSHy/+pZZLja4e+X5AHbfhkHrZW7uKWMLhbhfMHCbuq88hr9u4C6V7tSnbnejtbBvj58O5uIra5I7dYhsUvJ+xXL0YfxJpQLtQam6Xv73er86EJ83FbimzLHMrM90rC7tmy8tTeEu76FY0OSlcllPVLMGfI9Wwrk3MuJUzTCwmXrg+DjkufJBTXJZQ70q+pLFW0bpt0xl/1zl3+cx+OD314+DuXrtz0fcFLx+mzI4/m7Mq48FLC7jl0z89htMN36F6R7Ba0cKm5jYovJezWYvGjsfSKQI/sMc/tyusklhPeljkP8+GfEpo2p8ui5t/mw5SumvHtku/I9sdZRp9weGU+vK02t3OB0y6QrBfabepCWx69XzS3dem5mLLh9sYzzK/MFrVuXSfodHC7BfJuob40zuf7yCW0lkVney8vf9u56jx0CSdN0q/2iwlHs8ouMdQ1aneTy1h9yNYtjRd2YV3TpDnJpGh0NHA6N06rzJNB4k7yUv6FhLMkS3qmc6zq3g/1i0JKOhVd9/LUIhbnDxK+vYynzek8KQnzjNkSGpNaQmPajF/6XCdWdyY0NU33Y4JZn8p4a0RZ04iw1lWb3SddgKQyO2a5XpfXk/WYLcY2bPoY9YnTNY1bzwPt8555o37ROPkLe7B8tXXbtt29X1i7S4t+HLbtCxWdqzY912c/plk5l/ue3xP/v8d16d+HhL8fCX8/+c37L0+4zun47iIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBP9Q+0BiDJPPQNAgAAAABJRU5ErkJggg==";
  return (
    <div className="border rounded-lg hover:shadow-md dark:bg-slate-700">
      <Link to={`/project/${project.slug}`}>
        <img
          src={project.cover_photo ? project?.cover_photo : pic_url_sample}
          alt=""
          className="object-fill w-full h-48 rounded-lg"
        />
      </Link>
      <div className="px-4 py-2 ">
        <Link to={`/project/${project.slug}`}>
          <h1 className="text-2xl mt-3 font-medium hover:text-blue-500 text-gray-700 font-Roboto dark:text-slate-200">
            {project?.title.substring(0, 20)}
          </h1>
        </Link>
        <div className="flex items-center justify-between">
          <p className="capitalize text-green-600 text-md">
            by {project?.programmer?.first_name}{" "}
            {project?.programmer?.last_name}
          </p>

          <div
            className="px-2.5 py-0.5 rounded-full text-sm"
            style={{
              backgroundColor:
                project?.total_vote_count > 0 ? "#86efac" : "#fca5a5",
            }}
          >
            vote {project?.total_vote_count}
          </div>
        </div>

        <p className="text-justify indent-4 text-gray-700 dark:text-slate-200 mt-2">
          {project?.description.substring(0, 70)}...
        </p>
        <div className="grid grid-cols-3 my-1">
          {project?.techs.map((tech, index) => (
            <Badge key={index} item={tech.name} bgColor="#dbeafe" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
