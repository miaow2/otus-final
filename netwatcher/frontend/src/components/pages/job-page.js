import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import withNetWatcherService from '../hoc';
import { FailHighlighter, SuccessHighlighter } from './syntax-highlights';
import { PendingSpinner } from '../spinners';
import { Spinner } from '../spinners';


const msToTime = (s) => {

  const pad = (n, z = 2) => {
    return (`00${n}`).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
};

const JobView = ({ job }) => {

  const date = new Date(Date.parse(job.created));
  let completed = "—";
  let taken_time = "—";
  let status = <PendingSpinner />;
  let result = <FailHighlighter result="None" />;

  if (job.task) {
    const date_done = new Date(Date.parse(job.task.date_done))

    completed = `${date_done.toLocaleTimeString()} ${date_done.toLocaleDateString()}`
    status = job.task.status[0] + job.task.status.slice(1).toLowerCase()
    taken_time = msToTime(date_done - date)

    if (job.task.status === "SUCCESS") {
      status = <span className="badge badge-success" style={{ fontSize: '.7125rem' }}>Completed</span>
      // result = JSON.stringify(JSON.parse(job.task.result), undefined, 2);
      const responses = JSON.parse(job.task.result);
      result = responses.data.map((res) => (
        <div key={res.hostname}>
          <SuccessHighlighter result={res} />
        </div>
      ))

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
          <li className="list-group-item"><strong>Created:</strong> {date.toLocaleTimeString()} {date.toLocaleDateString()}</li>
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

const JobPage = ({ jobId, netwatcherService, location }) => {

  const [job, setjob] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (location.state === undefined) {
      const jobUrl = `/api/jobs/${jobId}/`;
      netwatcherService.getResources(jobUrl)
        .then((res) => res.json())
        .then((data) => {
          setjob(data);
          setIsLoaded(true);
        });
    } else {
      setjob(location.state.job);
      setIsLoaded(true);
    }
  }, []);

  const content = isLoaded ? <JobView job={job} /> : <Spinner />;

  return (
    <>
      {content}
    </>
  );
};

export default withNetWatcherService()(JobPage);