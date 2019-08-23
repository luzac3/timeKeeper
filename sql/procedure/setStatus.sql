DROP PROCEDURE IF EXISTS setStatus;
DELIMITER //
-- ********************************************************************************************
-- setStatus ステータスセット
--
-- 【処理概要】
--  ステータスを変更する
--
--
-- 【呼び出し元画面】
--   リスト
--
-- 【引数】
--      _cntnt_cd : コンテンツコード
--      _stts_cd : 更新するステータスコード
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.8.23 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `setStatus`(
    IN `_cntnt_cd` CHAR(4)
    ,IN `_stts_cd` VARCHAR(20)
    ,OUT `exit_cd` INTEGER
)
COMMENT 'ステータスセット'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
      UPDATE
          T_CNTNT
      SET
          STTS_CD = '",_stts_cd,"'
        WHERE
            CNTNT_CD = '",_cntnt_cd,"'
        ;
    ");
    SET @query_text = @query;

        -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
