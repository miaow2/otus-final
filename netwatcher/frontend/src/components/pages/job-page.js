import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { FailHighlighter, SuccessHighlighter } from './syntax-highlights';
import { PendingSpinner } from '../spinners';
import { Spinner } from '../spinners';

const JobView = ({ job }) => {

  let completed = "—";
  let taken_time = "—";
  let status = <PendingSpinner />;
  let result = <FailHighlighter result="None" />;

  if (job.task) {

    completed = <Moment format="HH:mm DD-MM-YYYY">{job.task.date_done}</Moment>;
    status = job.task.status[0] + job.task.status.slice(1).toLowerCase();
    taken_time = <span><Moment duration={job.created} date={job.task.date_done} /> mins</span>;

    if (job.task.status === "SUCCESS") {
      status = <span className="badge badge-success" style={{ fontSize: '.7125rem' }}>Completed</span>;
      const responses = JSON.parse(job.task.result);
      if (responses.data.length !== 0) {
        result = responses.data.map((res) => (
          <div key={res.hostname}>
            <SuccessHighlighter result={res} />
          </div>
        ))
      } else {
        result = <FailHighlighter result="Device group is empty" />;
      };
    } else if (job.task.status === "FAILURE") {
      status = <span className="badge badge-danger" style={{ fontSize: '.7125rem' }}>Failure</span>
      result = <FailHighlighter result={JSON.stringify(JSON.parse(job.task.result), undefined, 2)} />;
    }
  };


  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "30rem" }}>
        <h4 className="card-header">Job Info</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Group:</strong> <Link to={`/groups/${job.group.id}`} >{job.group.name}</Link></li>
          <li className="list-group-item"><strong>Command:</strong> {job.command}</li>
          <li className="list-group-item"><strong>Status:</strong> {status}</li>
          <li className="list-group-item"><strong>Created:</strong> <Moment format="HH:mm DD-MM-YYYY">{job.created}</Moment></li>
          <li className="list-group-item"><strong>Completed:</strong> {completed}</li>
          <li className="list-group-item"><strong>Taken Time:</strong> {taken_time}</li>
          <li className="list-group-item"><strong>User:</strong> {job.user.username}</li>
          <li className="list-group-item"><strong>Task ID:</strong> <samp>{job.task_uuid}</samp></li>
        </ul>
      </div>
      <h3>Results</h3>
      <div className="card bg-secondary mb-3">
        <div className="card-body">
          {result}
        </div>
      </div>
    </>
  );
};

const JobPage = ({ jobId, location }) => {

  const [job, setjob] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (location.state === undefined) {
      const jobUrl = `/api/jobs/${jobId}/`;
      axios.get(jobUrl)
        .then((res) => {
          setjob(res.data);
          setIsLoaded(true);
        });
    } else {
      setjob(location.state.job);
      setIsLoaded(true);
    }
    // eslint-disable-next-line
  }, []);

  const content = isLoaded ? <JobView job={job} /> : <Spinner />;

  return (
    <>
      {content}
    </>
  );
};

export default JobPage;