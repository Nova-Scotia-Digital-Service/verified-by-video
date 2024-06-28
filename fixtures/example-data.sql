BEGIN;
    INSERT INTO public.sessions VALUES
        ('88acfa3d-bf2f-4cae-8746-60a9106f6d56', '2024-05-08 19:01:48.776913+00', '2024-05-08 19:11:48.776913+00'),
        ('33aeaab8-0a6f-477f-815a-eb0559b1ba3a', '2024-05-10 13:05:18.691377+00', '2024-05-10 13:15:18.691377+00');

    INSERT INTO public.prompts VALUES
        ('10125e01-642d-4be5-bf1c-2e0575091b23', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Hold up two fingers'),
        ('8e579ca4-400f-4802-952a-54ae33e81799', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Touch your ear'),
        ('870fbfb4-2bab-4a91-b5b3-0d16d7220353', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Turn your head to the left'),
        ('4233b4fe-1690-4c4e-b6d7-06b3be941be0', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', 'Close your eyes'),
        ('2f5f457c-001c-464d-b224-3eb982af45f7', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', 'Hold up right palm'),
        ('50ff9898-9bba-43be-ab68-8dcb9ec3e879', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', 'Nod your head');

    INSERT INTO public.submissions VALUES
        ('214f747f-778a-4d4b-ab3b-5ed0c9410c69', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', '/media/example-video.mp4', '2024-05-08 19:01:48.776913+00'),
        ('be5a2859-8c30-4970-978f-ea30b295ad86', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', '/media/example-video.mp4', '2024-05-10 13:05:18.691377+00');

    INSERT INTO public.identification_cards (id, session_id, description, photo_url, upload_date) VALUES
        ('b70fc479-f960-4e43-92b0-669adf225a95', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Photo from the mobile app', '/media/example-photo-from-app.png', '2024-05-08 19:03:51.000000+00'),
        ('0cf13516-3636-437e-8863-13e7160a7ae9', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Front of Nova Scotia Driver''s License', '/media/example-photo-license-front.png', '2024-05-08 19:04:12.000000+00'),
        ('41cf1ceb-8801-4c88-9e87-cc93bd0f17a5', '88acfa3d-bf2f-4cae-8746-60a9106f6d56', 'Back of Nova Scotia Driver''s License', '/media/example-photo-license-back.png', '2024-05-08 19:05:53.000000+00'),
        ('caa2e19c-0024-4011-bafd-aa6dcdc51b8c', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', 'Photo on Nova Scotia Health Card', NULL, NULL),
        ('ec302835-cdcc-459a-bd5f-368b865a6a8a', '33aeaab8-0a6f-477f-815a-eb0559b1ba3a', 'Photo from the mobile app', '/media/example-photo-from-app.png', '2024-05-08 19:03:51.000000+00');

    INSERT INTO public.reviews VALUES
        ('532bd3f4-a0c5-4a97-87a9-19d46981747d', '214f747f-778a-4d4b-ab3b-5ed0c9410c69', 'PENDING'),
        ('cbb5b46a-ad3b-4a5f-954f-bff18024d1d6', 'be5a2859-8c30-4970-978f-ea30b295ad86', 'DENIED');

    INSERT INTO public.review_questions VALUES
        ('62333928-ade6-41c6-b131-d11efff04179', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Did the user correctly follow the prompts in the video?');
    INSERT INTO public.review_question_options VALUES
        ('153bc35d-3ae4-4746-abd4-106b12aeb187', '62333928-ade6-41c6-b131-d11efff04179', 'Yes, all prompts followed by user in the correct order'),
        ('390641de-5288-4261-ad59-7f28b05482c0', '62333928-ade6-41c6-b131-d11efff04179', 'Didn''t follow the prompts correctly'),
        ('287b76d4-21b4-4f5b-bfaa-1163abe5cc42', '62333928-ade6-41c6-b131-d11efff04179', 'Too low quality video/photo for matching'),
        ('02955e84-81b2-4eb9-9aef-4913ec9e3dc8', '62333928-ade6-41c6-b131-d11efff04179', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('5f816b66-d431-4642-9822-ae2dbd186e38', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What name did they provide?');
    INSERT INTO public.review_question_options VALUES
        ('7d479637-c890-47fb-b879-a9c27355e776', '5f816b66-d431-4642-9822-ae2dbd186e38', 'NONPHOTO, PERCY or an acceptable variation'),
        ('b392059a-445a-436b-8fcf-cf43a5b6b8da', '5f816b66-d431-4642-9822-ae2dbd186e38', 'Didn''t provide the correct name'),
        ('d1ce043d-8b6d-42c2-9c03-0972a514c3ca', '5f816b66-d431-4642-9822-ae2dbd186e38', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('9d211ed5-59c4-415d-b782-be6499205b2f', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Do all three match: photo on the ID document, video, photo taken in the app?');
    INSERT INTO public.review_question_options VALUES
        ('a6005f55-aac0-4e26-ba67-11aff456bf5b', '9d211ed5-59c4-415d-b782-be6499205b2f', 'Yes, all match'),
        ('0da3c0e3-6535-496b-85cc-186cc84ca767', '9d211ed5-59c4-415d-b782-be6499205b2f', 'Not all match'),
        ('eb6f5cdf-14fc-455e-bab4-2b27e98942c9', '9d211ed5-59c4-415d-b782-be6499205b2f', 'Too low quality video or photo for matching'),
        ('6a9a2cb0-b9a2-4959-b483-bbc6c4197593', '9d211ed5-59c4-415d-b782-be6499205b2f', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('5e6fd189-c934-4049-bc00-246f2cd9c85e', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What type of ID is provided?');
    INSERT INTO public.review_question_options VALUES
        ('4b85d528-a3a8-49c3-a13d-30c566c0c329', '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'Nova Scotia Driver''s License'),
        ('c694c9d7-d5f4-4024-8834-21a800c3a4be', '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'Other type'),
        ('ece94423-fb18-4aa9-8c16-6f46da09c259', '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('957250ed-35cb-4315-a2f5-3efd4667f829', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What number is on Nova Scotia Driver''s License?');
    INSERT INTO public.review_question_options VALUES
        ('64b8cfd3-6d98-40c8-af7a-1dc1c9cc4df2', '957250ed-35cb-4315-a2f5-3efd4667f829', '12121212'),
        ('c40383be-a2c2-4eb7-8b91-93ee430efb3f', '957250ed-35cb-4315-a2f5-3efd4667f829', 'Other type'),
        ('5254b514-30bf-4615-8db5-b8d1225b4488', '957250ed-35cb-4315-a2f5-3efd4667f829', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('3ea886c1-b97c-4e30-90bd-f1551df1a632', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What is the birthdate on the ID?');
    INSERT INTO public.review_question_options VALUES
        ('3b1ca3d6-de80-4b27-aeff-2c8d4237088c', '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'January 1, 1990'),
        ('19a884e4-02d9-4f41-9fb6-2a7b528f3db4', '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'Does not match'),
        ('a44ee7e6-ae27-42ef-aa3e-ce9b54a3dbcf', '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('1ae8b631-a95d-4b55-a599-aec2919096c0', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What name is on the ID?');
    INSERT INTO public.review_question_options VALUES
        ('80ed0dc2-1a93-4c38-ae36-25cbc8659c53', '1ae8b631-a95d-4b55-a599-aec2919096c0', 'NONPHOTO, PERCY or an acceptable variation'),
        ('f4b80b72-4df8-4433-bbf6-41fc80ed8455', '1ae8b631-a95d-4b55-a599-aec2919096c0', 'Does not match'),
        ('b87e1c07-0af9-44f1-85df-e32142a8c5d3', '1ae8b631-a95d-4b55-a599-aec2919096c0', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('71712d42-c574-46cf-826e-f76db3a9749f', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Is the ID valid?');
    INSERT INTO public.review_question_options VALUES
        ('86b271cf-6517-40ac-a11b-ae91c81dbafa', '71712d42-c574-46cf-826e-f76db3a9749f', 'Is valid, not expired'),
        ('67440bce-44ca-4c57-9d0a-e6e8881a2997', '71712d42-c574-46cf-826e-f76db3a9749f', 'Expired'),
        ('c0df2424-327b-4220-b6bd-add4dc58fd92', '71712d42-c574-46cf-826e-f76db3a9749f', 'Doesn''t appear to be genuine (e.g. not an original document, missing security feature)'),
        ('dbd486a9-e3b5-4fe1-a0ba-0a7682422684', '71712d42-c574-46cf-826e-f76db3a9749f', 'Not an acceptable document');

    INSERT INTO public.review_questions VALUES
        ('676fac34-b6e5-4cff-b523-0a4bbc7bca88', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Are you confident this is who they say they are?');
    INSERT INTO public.review_question_options VALUES
        ('357a3e84-8376-4594-ab3f-a6b8c436c2da', '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Yes I am confident'),
        ('6fea484e-c28e-45b2-ab38-a84a4790eefa', '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Possible suspicious activity'),
        ('d2d4ec17-dff5-4ece-8923-44f6130d195f', '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Not confident enough to verify for other reason');
COMMIT;
