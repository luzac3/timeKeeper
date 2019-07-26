DROP PROCEDURE IF EXISTS newEvnt;
DELIMITER //
-- ********************************************************************************************
-- newEvnt �V�K�C�x���g�R�[�h���쐬����
--
-- �y�����T�v�z
--  �V�K�̃C�x���g���쐬����
--
--
-- �y�Ăяo������ʁz
--   ���X�g
--
-- �y�����z
--      �Ȃ�
--
--
-- �y�߂�l�z
--      exit_cd            : exit_cd
--      ����F0
--      �ُ�F99
-- --------------------------------------------------------------------------------------------
-- �y�X�V�����z
--  2019.7.25 �吙�@�V�K�쐬
-- ********************************************************************************************
CREATE PROCEDURE `newEvnt`(
    OUT `exit_cd` INTEGER
)
COMMENT '�V�C�x���g�쐬'

BEGIN

    -- �ُ�I���n���h��
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    SELECT
        LPAD(MAX(CAST(CNTNT_CD AS SIGNED)) + 1 ,4 ,0) INTO @NEW_CNTNT_CD
    FROM
        T_CNTNT
    ;

    INSERT INTO
        T_CNTNT
    VALUES(
        @NEW_CNTNT_CD
        ,NULL
        ,""
        ,0
        ,"0000-00-00 00:00:00.000"
        ,"0000-00-00 00:00:00.000"
        ,NULL
        ,""
        ,NULL
    );

    set @query = CONCAT("
        SELECT
            CNTNT_CD
        FROM
            T_CNTNT
        WHERE
            CNTNT_CD = '",@NEW_CNTNT_CD,"'
        ;
    ");

    SET @query_text = @query;

        -- ���s
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
