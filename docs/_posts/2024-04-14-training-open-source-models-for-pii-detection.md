---
layout: post
title: 'Training open source models for PII detection'
date: 2024-04-14 15:23:07 -0800
categories: Posts
---

# Training BERT for PII Detection in Named Entity Recognition

In this post, I detail my journey of training an open-source BERT model specifically for detecting Personally Identifiable Information (PII) such as names, social security numbers (SSNs), and phone numbers. The goal is to share insights on generating synthetic data, fine-tuning techniques, hardware utilization, and areas for future improvement.

## Synthetic Data Generation

Generating synthetic data is crucial for training NER models when actual annotated datasets are limited or unavailable due to privacy concerns. Here’s how I generated synthetic data with common PII entities:

```python
from faker import Faker
fake = Faker()

# Generating synthetic examples for PERSON, SSN, and PHONE_NUMBER
for _ in range(1000):
    person = fake.name()
    ssn = fake.ssn()
    phone_number = fake.phone_number()
    print(f"Name: {person}, SSN: {ssn}, Phone: {phone_number}")
```

This simple script uses the `Faker` library to create realistic-looking but entirely fictional PII data.

## Model Fine-Tuning

Fine-tuning a pre-trained BERT model involves several key parameters that need careful consideration to balance between overfitting and underfitting, as well as to optimize the training time.

### Fine-Tuning Parameters

- **Batch Size**: 16
- **Learning Rate**: 2e-5
- **Epochs**: 4

These values were chosen based on the model's performance on validation data during preliminary tests.

### Training Script

```python
from transformers import BertForTokenClassification, Trainer, TrainingArguments

model = BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=num_labels)

training_args = TrainingArguments(
    output_dir='./models/',
    num_train_epochs=4,
    per_device_train_batch_size=16,
    learning_rate=2e-5,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=valid_dataset
)

trainer.train()
```

## Utilizing Dedicated GPUs on RunPod

Training deep learning models, especially those based on the BERT architecture, can be resource-intensive. I used dedicated GPUs available on RunPod, which significantly decreased my training times and allowed for more experiments in less time.

```shell
# Command to start a GPU-enabled training session on RunPod
runpod run --gpu 2 --memory 16GB -- python train_model.py
```

## Future Improvements

While the current setup provides a solid foundation, here are some improvements for future consideration:

- **Experiment with different tokenization techniques**: Exploring subword tokenization might capture PII entities better.
- **Dynamic learning rate adjustments**: Implementing learning rate schedules such as cyclical learning rates could potentially improve training dynamics.
- **Data augmentation**: Introducing more sophisticated text augmentation techniques that mimic real-world data entry errors.

## Conclusion

Training a BERT model for PII detection has been a rewarding challenge. The insights gained from synthetic data generation and fine-tuning techniques have opened up new avenues for exploring how deep learning can be applied responsibly and effectively in privacy-sensitive areas.

---
