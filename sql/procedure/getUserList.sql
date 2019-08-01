DROP PROCEDURE IF EXISTS getUserList;
DELIMITER //
-- ********************************************************************************************
-- getUserList ���ׂẴ��[�U�[���擾����
--
-- �y�����T�v�z
--  ���ׂẴ��[�U�[���擾����
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
--  2019.7.30 �吙�@�V�K�쐬
-- ********************************************************************************************
CREATE PROCEDURE `getUserList`(
    OUT `exit_cd` INTEGER
)
COMMENT '�C�x���g���X�g�擾'

BEGIN

    -- �ُ�I���n���h��
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            JNNR_CD
            ,JNNR_NM
        FROM
            T_JNNR
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
