CREATE TABLE IF NOT EXISTS prompts_list (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    text varchar(255) NOT NULL
);

INSERT INTO prompts_list (text) VALUES
('Hold up one finger'),
('Hold up two fingers'),
('Hold up three fingers'),
('Touch your ear'),
('Touch your shoulder'),
('Touch your nose'),
('Turn your head to the left'),
('Turn your head to the right');