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

    INSERT INTO public.identification_cards VALUES
        ('b70fc479-f960-4e43-92b0-669adf225a95', '214f747f-778a-4d4b-ab3b-5ed0c9410c69', 'Photo from the mobile app', '/media/example-photo-from-app.png', '2024-05-08 19:03:51.000000+00'),
        ('0cf13516-3636-437e-8863-13e7160a7ae9', '214f747f-778a-4d4b-ab3b-5ed0c9410c69', 'Front of Nova Scotia Driver''s License', '/media/example-photo-license-front.png', '2024-05-08 19:04:12.000000+00'),
        ('41cf1ceb-8801-4c88-9e87-cc93bd0f17a5', '214f747f-778a-4d4b-ab3b-5ed0c9410c69', 'Back of Nova Scotia Driver''s License', '/media/example-photo-license-back.png', '2024-05-08 19:05:53.000000+00'),
        ('caa2e19c-0024-4011-bafd-aa6dcdc51b8c', 'be5a2859-8c30-4970-978f-ea30b295ad86', 'Photo on Nova Scotia Health Card', NULL, NULL),
        ('ec302835-cdcc-459a-bd5f-368b865a6a8a', 'be5a2859-8c30-4970-978f-ea30b295ad86', 'Photo from the mobile app', '/media/example-photo-from-app.png', '2024-05-08 19:03:51.000000+00');

    INSERT INTO public.reviews VALUES
        ('532bd3f4-a0c5-4a97-87a9-19d46981747d', '214f747f-778a-4d4b-ab3b-5ed0c9410c69', 'PENDING'),
        ('cbb5b46a-ad3b-4a5f-954f-bff18024d1d6', 'be5a2859-8c30-4970-978f-ea30b295ad86', 'DENIED');

    INSERT INTO public.review_questions VALUES
        ('62333928-ade6-41c6-b131-d11efff04179', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Did the user correctly follow the prompts in the video?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '62333928-ade6-41c6-b131-d11efff04179', 'Yes, all prompts followed by user in the correct order'),
        (gen_random_uuid(), '62333928-ade6-41c6-b131-d11efff04179', 'Didn''t follow the prompts correctly'),
        (gen_random_uuid(), '62333928-ade6-41c6-b131-d11efff04179', 'Too low quality video/photo for matching'),
        (gen_random_uuid(), '62333928-ade6-41c6-b131-d11efff04179', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('5f816b66-d431-4642-9822-ae2dbd186e38', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What name did they provide?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '5f816b66-d431-4642-9822-ae2dbd186e38', 'NONPHOTO, PERCY or an acceptable variation'),
        (gen_random_uuid(), '5f816b66-d431-4642-9822-ae2dbd186e38', 'Didn''t provide the correct name'),
        (gen_random_uuid(), '5f816b66-d431-4642-9822-ae2dbd186e38', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('9d211ed5-59c4-415d-b782-be6499205b2f', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Do all three match: photo on the ID document, video, photo taken in the app?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '9d211ed5-59c4-415d-b782-be6499205b2f', 'Yes, all match'),
        (gen_random_uuid(), '9d211ed5-59c4-415d-b782-be6499205b2f', 'Not all match'),
        (gen_random_uuid(), '9d211ed5-59c4-415d-b782-be6499205b2f', 'Too low quality video or photo for matching'),
        (gen_random_uuid(), '9d211ed5-59c4-415d-b782-be6499205b2f', 'Couldn''t complete for other reason');

    INSERT INTO public.review_questions VALUES
        ('5e6fd189-c934-4049-bc00-246f2cd9c85e', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What type of ID is provided?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'Nova Scotia Driver''s License'),
        (gen_random_uuid(), '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'Other type'),
        (gen_random_uuid(), '5e6fd189-c934-4049-bc00-246f2cd9c85e', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('957250ed-35cb-4315-a2f5-3efd4667f829', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What number is on Nova Scotia Driver''s License?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '957250ed-35cb-4315-a2f5-3efd4667f829', '12121212'),
        (gen_random_uuid(), '957250ed-35cb-4315-a2f5-3efd4667f829', 'Other type'),
        (gen_random_uuid(), '957250ed-35cb-4315-a2f5-3efd4667f829', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('3ea886c1-b97c-4e30-90bd-f1551df1a632', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What is the birthdate on the ID?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'January 1, 1990'),
        (gen_random_uuid(), '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'Does not match'),
        (gen_random_uuid(), '3ea886c1-b97c-4e30-90bd-f1551df1a632', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('1ae8b631-a95d-4b55-a599-aec2919096c0', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'What name is on the ID?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '1ae8b631-a95d-4b55-a599-aec2919096c0', 'NONPHOTO, PERCY or an acceptable variation'),
        (gen_random_uuid(), '1ae8b631-a95d-4b55-a599-aec2919096c0', 'Does not match'),
        (gen_random_uuid(), '1ae8b631-a95d-4b55-a599-aec2919096c0', 'I can''t confirm');

    INSERT INTO public.review_questions VALUES
        ('71712d42-c574-46cf-826e-f76db3a9749f', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Is the ID valid?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '71712d42-c574-46cf-826e-f76db3a9749f', 'Is valid, not expired'),
        (gen_random_uuid(), '71712d42-c574-46cf-826e-f76db3a9749f', 'Expired'),
        (gen_random_uuid(), '71712d42-c574-46cf-826e-f76db3a9749f', 'Doesn''t appear to be genuine (e.g. not an original document, missing security feature)'),
        (gen_random_uuid(), '71712d42-c574-46cf-826e-f76db3a9749f', 'Not an acceptable document');

    INSERT INTO public.review_questions VALUES
        ('676fac34-b6e5-4cff-b523-0a4bbc7bca88', '532bd3f4-a0c5-4a97-87a9-19d46981747d', 'Are you confident this is who they say they are?');
    INSERT INTO public.review_question_options VALUES
        (gen_random_uuid(), '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Yes I am confident'),
        (gen_random_uuid(), '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Possible suspicious activity'),
        (gen_random_uuid(), '676fac34-b6e5-4cff-b523-0a4bbc7bca88', 'Not confident enough to verify for other reason');
COMMIT;
