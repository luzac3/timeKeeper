DROP PROCEDURE IF EXISTS getEvntLst;
DELIMITER //
-- ********************************************************************************************
-- getEvntLst �C�x���g�ꗗ���擾����
--
-- �y�����T�v�z
--  �S�ẴC�x���g���J�Ó������ɗ񋓂���
--
--
-- �y�Ăяo�������ʁz
--   �G���g�����X
--
-- �y�����z
--   �Ȃ�
--
--
-- �y�߂��l�z
--      exit_cd            : exit_cd
--      �����F0
--      �ُ��F99
-- --------------------------------------------------------------------------------------------
-- �y�X�V�����z
--  2019.7.23 �吙�@�V�K�쐬
-- ********************************************************************************************
CREATE PROCEDURE `getEvntLst`(
    OUT `exit_cd` INTEGER
)
COMMENT '�C�x���g���X�g�擾'

BEGIN

    -- �ُ��I���n���h��
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            TC.CNTNT_CD
            ,TC.PRNT_CNTNT_CD
            ,TC.TTL
            ,TC.STTS_CD
            ,CSC.STTS
            ,TC.STT_TM
            ,DATE_FORMAT(TC.STT_TM, '%H:%i') as STT_HM
            ,DATE_FORMAT(TC.STT_TM, '%Y%m%d %H:%i') as STT_DTTM
            ,TC.END_TM
            ,DATE_FORMAT(TC.END_TM, '%H:%i') as END_HM
            ,DATE_FORMAT(TC.END_TM, '%Y%m%d %H:%i') as END_DTTM
            ,DATE_FORMAT(TC.GTHR_TM, '%H:%i') as GTHR_HM
            ,TC.CNTNT
            ,TC.RMRKS
        FROM
            T_CNTNT TC
        LEFT OUTER JOIN C_STTS_CD CSC
            ON
                TC.STTS_CD = CSC.STTS_CD
        ORDER BY STT_TM,END_TM DESC
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
