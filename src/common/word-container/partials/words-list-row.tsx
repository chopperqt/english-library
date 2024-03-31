import {
  CellMeasurer,
} from "react-virtualized";
import { Typography } from "antd";

import { WordApi } from "@models/Library.models";

import Pined from "./Pined";
import Edit from "../components/editWord/EditWord";
import Delete from "./Delete";
import ExtraWords from "./ExtraWords";

import styles from '../WordContainer.module.scss'

const { Text } = Typography

interface Props {
  key: string
  index: number
  id: number
  translate: string[],
  wordName: string
  pined: boolean
  parent: any
  style: any
  cache: any
  onPin: (wordName: string, pined: boolean) => void
  onDelete: (wordName: string) => Promise<WordApi[] | null>
  onSubmitUpdate: any
}

export const WordsListRow = ({
  id,
  key,
  cache,
  parent,
  style,
  index,
  wordName,
  pined,
  translate,
  onPin,
  onDelete,
  onSubmitUpdate,
}: Props) => {
  return (
    <CellMeasurer
      key={key}
      index={index}
      cache={cache?.current as any}
      parent={parent}
      style={style}
    >
      <div
        key={key}
        style={style}
        className="flex items-center"
      >
        <div className="flex">
          <Pined
            onClick={() => onPin(wordName, pined)}
            isPined={pined}
          />
          <Edit
            onSubmit={onSubmitUpdate}
            wordID={id}
            word={wordName}
            translate={translate}
            pined={pined}
          />
          <Delete
            onClick={() => onDelete(wordName)}
          />
        </div>

        <Text className={styles.text}>
          {wordName}&nbsp;—&nbsp;
          {!!translate?.[0] && translate[0]}
          {translate?.length > 1 && (
            <ExtraWords words={translate} />
          )}
        </Text>
      </div>
    </CellMeasurer>
  )
}
