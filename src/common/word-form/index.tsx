import {
  Form,
  Button,
  Select,
  Input,
  Switch,
  Typography,
} from "antd";

import { WordFormFields } from './constants'

import type { WordForm as IWordForm } from "@models/Library.models";

const { Text } = Typography

const TOGGLER_TEXT = "Need to bookmark ?";
const PLACEHOLDER_WORD_TEXT = "Example";
const PLACEHOLDER_TRANSLATE_TEXT = "Пример";
const CHECKED_TEXT = 'Yes'
const UNCHECKED_TEXT = 'No'

interface WordFormProps {
  buttonText: string
  onSubmit: (formData: IWordForm) => void
  isLoading?: boolean
  initialValues?: Partial<IWordForm>
  isDisabledPin?: boolean
}

export const WordForm = ({
  buttonText,
  onSubmit,
  isLoading = false,
  initialValues,
  isDisabledPin,
}: WordFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      className="w-full max-w-2xl flex flex-col"
      data-testid="word-modal-form"
      form={form}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item {...WordFormFields.word}>
        <Input
          size="large"
          placeholder={PLACEHOLDER_TRANSLATE_TEXT}
        />
      </Form.Item>
      <Form.Item {...WordFormFields.translate}>
        <Select
          size="large"
          mode="tags"
          placeholder={PLACEHOLDER_WORD_TEXT}
        />
      </Form.Item>
      <div className="flex gap-x-1 justify-between">
        <Text>{TOGGLER_TEXT}</Text>
        <Form.Item {...WordFormFields.pined}>
          <Switch
            disabled={isDisabledPin}
            checkedChildren={CHECKED_TEXT}
            unCheckedChildren={UNCHECKED_TEXT}
          />
        </Form.Item>
      </div>
      <Button
        type="primary"
        size="large"
        className="w-full"
        htmlType="submit"
        loading={isLoading}
      >
        {buttonText}
      </Button>
    </Form>

  );
}
