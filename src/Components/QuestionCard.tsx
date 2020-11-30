import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_types';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      textAlign:'start',
      margin:'20px',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(180),
        height: theme.spacing(20),
      },
    },
  }),
);
const QuestionCard: React.FC<questionPropsType> = ({ question, options, callback }) => {

    let [selectedAns, setSelectedAns] = useState("");

    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <div className="question">
                    <h4>{question}</h4>
                </div>

                <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
                    className="question-form"
                    >
                    {
                        options.map((opt: string, ind: number) => {
                            return (
                                <div key={ind}>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="opt"
                                            required
                                            value={opt}
                                            checked={selectedAns === opt}
                                            onChange={handleSelection}
                                        />
                                        {opt}
                                    </label>
                                </div>
                            )
                        })
                    }
                    <input type="submit" name="Next" className="submit"/>
                </form>
            </Paper>
        </div>
    )
}

export default QuestionCard;