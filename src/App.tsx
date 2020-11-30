import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_service';
import { QuizType } from './Types/quiz_types';
import QuestionCard from './Components/QuestionCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { GridOverlay} from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    developer: {
      textAlign: "left",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'100%',
    },
  }),
);

function App() {
  const classes = useStyles();
  let [quiz, setQuiz] = useState<QuizType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const questions: QuizType[] = await getQuizDetails(10, 'easy');
      setQuiz(questions)
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuizType = quiz[currentStep];

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {
      setShowResult(true);
    }
  }


  if (!quiz.length)
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: '50px', width: '100%' }}>
          <LinearProgress />
        </div>
    </GridOverlay>
    )

  if (showResult) {
    return (
    <div>
      <Paper elevation={3} className={classes.paper}>
      <h1>Result</h1>
      <h2>Total Score = {quiz.length}</h2>
      <h2>Your Score = {score}</h2>
      <button onClick={()=>{window.location.reload(false);}}>Give Quiz Again</button>
    </Paper>
    </div>)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Quiz App
          </Typography>
          <Typography variant="h6" className={classes.developer}>
            Developed by : Zubair Hunjrah
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <QuestionCard
              options={quiz[currentStep].option}
              question={quiz[currentStep].question}
              callback={handleSubmit}
            />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;